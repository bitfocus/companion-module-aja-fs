import { InstanceStatus } from '@companion-module/base'
import type { ModuleInstance } from './main.js'

export interface ParamEvent {
	paramid: string
	value: string
}

export class AjaFsHdrApi {
	private instance: ModuleInstance
	private host: string
	private port: number
	private pollInterval: number
	private connectionId: string | null = null
	private pollTimer: ReturnType<typeof setTimeout> | null = null
	private destroyed = false
	private reconnectTimer: ReturnType<typeof setTimeout> | null = null
	private reconnectDelay = 1000

	constructor(instance: ModuleInstance, host: string, port: number, pollInterval: number) {
		this.instance = instance
		this.host = host
		this.port = port
		this.pollInterval = pollInterval
	}

	private get baseUrl(): string {
		return `http://${this.host}:${this.port}`
	}

	async connect(): Promise<void> {
		this.destroyed = false
		this.instance.updateStatus(InstanceStatus.Connecting)

		try {
			// Verify device is reachable and detect device type
			const result = await this.getParam('eParamID_ProductID')
			if (result === null) {
				throw new Error('Device did not respond')
			}

			// Detect device type before fetching state
			await this.instance.onDeviceDetected(result)

			this.instance.log('info', `Connected to device at ${this.host}:${this.port}`)
			this.instance.updateStatus(InstanceStatus.Ok)
			this.reconnectDelay = 1000

			// Start event polling
			await this.startEventPolling()

			// Initial variable fetch
			await this.instance.fetchInitialState()
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err)
			this.instance.log('error', `Connection failed: ${msg}`)
			this.instance.updateStatus(InstanceStatus.ConnectionFailure, msg)
			this.scheduleReconnect()
		}
	}

	disconnect(): void {
		this.destroyed = true
		this.connectionId = null

		if (this.pollTimer) {
			clearTimeout(this.pollTimer)
			this.pollTimer = null
		}

		if (this.reconnectTimer) {
			clearTimeout(this.reconnectTimer)
			this.reconnectTimer = null
		}
	}

	private scheduleReconnect(): void {
		if (this.destroyed) return

		this.reconnectTimer = setTimeout(() => {
			if (!this.destroyed) {
				this.instance.log('debug', 'Attempting reconnect...')
				void this.connect()
			}
		}, this.reconnectDelay)

		// Exponential backoff, max 30s
		this.reconnectDelay = Math.min(this.reconnectDelay * 2, 30000)
	}

	private async startEventPolling(): Promise<void> {
		if (this.destroyed) return

		try {
			const response = await this.httpGet('/config?action=connect')
			if (response && !Array.isArray(response) && 'connectionid' in response) {
				this.connectionId = response.connectionid as string
				this.instance.log('debug', `Event connection opened: ${this.connectionId}`)
				this.pollEvents()
			}
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err)
			this.instance.log('warn', `Failed to open event connection: ${msg}`)
			this.startIntervalPolling()
		}
	}

	private pollEvents(): void {
		if (this.destroyed || !this.connectionId) return

		this.pollTimer = setTimeout(() => {
			if (this.destroyed) return

			void (async () => {
				try {
					const response = await this.httpGet(`/config?action=wait_for_config_events&connectionid=${this.connectionId}`)

					if (Array.isArray(response)) {
						for (const event of response as ParamEvent[]) {
							this.instance.handleParamChange(event.paramid, event.value)
						}
					}

					this.pollEvents()
				} catch {
					this.instance.log('warn', 'Event poll failed, reconnecting...')
					this.connectionId = null
					this.instance.updateStatus(InstanceStatus.ConnectionFailure, 'Event poll failed')
					this.scheduleReconnect()
				}
			})()
		}, 100)
	}

	private startIntervalPolling(): void {
		if (this.destroyed) return

		this.pollTimer = setTimeout(() => {
			if (this.destroyed) return

			void (async () => {
				try {
					await this.instance.fetchInitialState()
					this.startIntervalPolling()
				} catch {
					this.instance.log('warn', 'Interval poll failed, reconnecting...')
					this.instance.updateStatus(InstanceStatus.ConnectionFailure, 'Poll failed')
					this.scheduleReconnect()
				}
			})()
		}, this.pollInterval)
	}

	async getParam(paramId: string): Promise<string | null> {
		try {
			const response = await this.httpGet(`/config?action=get&paramid=${paramId}`)
			if (response && 'value' in response) {
				return String(response.value)
			}
			return null
		} catch {
			return null
		}
	}

	async setParam(paramId: string, value: string | number): Promise<boolean> {
		try {
			const response = await this.httpGet(`/config?action=set&paramid=${paramId}&value=${value}`)
			return response !== null
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err)
			this.instance.log('error', `Failed to set ${paramId}: ${msg}`)
			return false
		}
	}

	private async httpGet(path: string): Promise<Record<string, unknown> | unknown[] | null> {
		const url = `${this.baseUrl}${path}`
		const controller = new AbortController()
		const timeout = setTimeout(() => controller.abort(), 10000)

		try {
			// eslint-disable-next-line n/no-unsupported-features/node-builtins
			const response = await fetch(url, { signal: controller.signal })
			if (!response.ok) {
				throw new Error(`HTTP ${response.status} ${response.statusText}`)
			}
			return (await response.json()) as Record<string, unknown> | unknown[]
		} finally {
			clearTimeout(timeout)
		}
	}
}
