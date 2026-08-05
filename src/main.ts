import { InstanceBase, runEntrypoint, InstanceStatus, type SomeCompanionConfigField } from '@companion-module/base'
import { GetConfigFields, type ModuleConfig } from './config.js'
import { UpdateVariableDefinitions, buildParamToVariableMap } from './variables.js'
import { UpgradeScripts } from './upgrades.js'
import { UpdateActions } from './actions.js'
import { UpdateFeedbacks } from './feedbacks.js'
import { UpdatePresets } from './presets.js'
import { AjaFsHdrApi } from './api.js'
import { detectDevice, getVideoChannels, type DeviceType, type ParamChoice } from './params.js'

export class ModuleInstance extends InstanceBase<ModuleConfig> {
	config!: ModuleConfig
	api: AjaFsHdrApi | null = null
	connected = false
	deviceState: Record<string, string> = {}
	deviceType: DeviceType = 'unknown'
	private paramToVariable: Record<string, string> = {}

	constructor(internal: unknown) {
		super(internal)
	}

	async init(config: ModuleConfig): Promise<void> {
		this.config = config

		// Set up with default (unknown) device type first
		this.rebuildDefinitions()

		if (this.config.host) {
			this.initApi()
		} else {
			this.updateStatus(InstanceStatus.Disconnected, 'No host configured')
		}
	}

	async destroy(): Promise<void> {
		this.log('debug', 'destroy')
		if (this.api) {
			this.api.disconnect()
			this.api = null
		}
		this.connected = false
	}

	async configUpdated(config: ModuleConfig): Promise<void> {
		const hostChanged = this.config.host !== config.host || this.config.port !== config.port
		this.config = config

		if (hostChanged) {
			if (this.api) {
				this.api.disconnect()
				this.api = null
			}
			this.connected = false
			this.deviceType = 'unknown'

			if (this.config.host) {
				this.initApi()
			} else {
				this.updateStatus(InstanceStatus.Disconnected, 'No host configured')
			}
		}
	}

	getConfigFields(): SomeCompanionConfigField[] {
		return GetConfigFields()
	}

	/** Get video channel choices for the detected device */
	getChannelChoices(): ParamChoice[] {
		return getVideoChannels(this.deviceType)
	}

	private initApi(): void {
		this.api = new AjaFsHdrApi(this, this.config.host, this.config.port, this.config.pollInterval)
		void this.api.connect()
	}

	/** Called by API when device is first reached — detect type and rebuild */
	async onDeviceDetected(productId: string): Promise<void> {
		const newType = detectDevice(productId)
		if (newType !== this.deviceType) {
			this.deviceType = newType
			this.log('info', `Detected device type: ${this.deviceType} (product: ${productId})`)
			this.setVariableValues({ device_type: this.deviceType, product_id: productId })
			this.rebuildDefinitions()
		}
	}

	/** Rebuild all definitions based on current device type */
	private rebuildDefinitions(): void {
		this.paramToVariable = buildParamToVariableMap(this.deviceType)
		UpdateVariableDefinitions(this)
		UpdateActions(this)
		UpdateFeedbacks(this)
		UpdatePresets(this)
	}

	/** Called by the API client when a parameter changes */
	handleParamChange(paramId: string, value: string): void {
		const variableId = this.paramToVariable[paramId]
		if (variableId) {
			this.deviceState[variableId] = value
			this.setVariableValues({ [variableId]: value })

			if (variableId.startsWith('sdi') && variableId.endsWith('_format')) {
				this.checkFeedbacks('sdiInputDetected')
			}
			if (variableId.endsWith('_freeze')) {
				this.checkFeedbacks('channelFrozen')
			}
		}
	}

	/** Fetch all tracked parameters from the device */
	async fetchInitialState(): Promise<void> {
		if (!this.api) return

		const variables: Record<string, string> = {}

		for (const paramId of Object.keys(this.paramToVariable)) {
			const value = await this.api.getParam(paramId)
			if (value !== null) {
				const variableId = this.paramToVariable[paramId]
				if (variableId) {
					this.deviceState[variableId] = value
					variables[variableId] = value
				}
			}
		}

		this.setVariableValues(variables)
		this.connected = true
		this.checkFeedbacks('connectionStatus', 'sdiInputDetected', 'channelFrozen')
	}

	/** Public wrapper for API setParam, used by actions */
	async apiSetParam(paramId: string, value: string | number): Promise<void> {
		if (this.api) {
			await this.api.setParam(paramId, value)
		}
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
