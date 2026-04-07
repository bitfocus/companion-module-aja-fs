import type { CompanionStaticUpgradeScript } from '@companion-module/base'
import type { ModuleConfig } from './config.js'

// No upgrades needed for initial release
export const UpgradeScripts: CompanionStaticUpgradeScript<ModuleConfig>[] = []
