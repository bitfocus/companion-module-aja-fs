# AJA FS Series

Control AJA FS2, FS4, and FS-HDR frame synchronizers and converters from Companion.

The module auto-detects which device you're connected to and adjusts available actions, variables, and presets accordingly.

## Configuration

- **Device IP**: The IP address of your FS device
- **Port**: HTTP port (default: 80)
- **Poll Interval**: How often to poll for parameter changes in milliseconds (default: 3000)

## Supported Devices

- **FS2**: 2-channel frame sync/converter with YUV ProcAmp and RGB Color Corrector
- **FS4**: 4-channel frame sync/converter with HDR/WCG processing
- **FS-HDR**: 4-channel HDR/WCG real-time converter with Colorfront Engine

## Actions

### All Devices

- **Recall Preset** / **Save Preset** (1-40)
- **Set Genlock Source**
- **Freeze Output** (per channel)
- **Set Loss of Input Action** (per channel)
- **Set Parameter** (from categorized list or custom ID)

### FS4 / FS-HDR

- **Set HDR Transform Mode** (Colorfront Live/Film/TV, BBC HLG, NBCU, User LUT)
- **Set Colorfront Engine Mode** (Default/Adjust)
- **Set Dynamic Range & Gamut** (IN and OUT)
- **Set TV Conversion** (SDR/HLG/PQ conversions)
- **SDR Preview** toggle
- **Reset HDR Color**
- **Test Pattern Generator** with pattern type selection
- **Set Background Fill**

## Variables

- `$(aja-fs:device_type)` — Detected device (FS2, FS4, FS-HDR)
- `$(aja-fs:system_name)` — Device name
- `$(aja-fs:sdi1_format)` through `$(aja-fs:sdi8_format)` — SDI input formats
- `$(aja-fs:vid1_detected_format)` through `$(aja-fs:vid4_detected_format)` — Per-channel input
- `$(aja-fs:vid1_output_format)` through `$(aja-fs:vid4_output_format)` — Per-channel output
- `$(aja-fs:vid1_hdr_transform)` through `$(aja-fs:vid4_hdr_transform)` — HDR mode (FS4/FS-HDR)
- `$(aja-fs:ref_format)` / `$(aja-fs:genlock_source)` — Reference info

## Presets

Pre-built buttons organized by category:

- **Status**: Connection status with device name
- **Presets**: Recall and Save for presets 1-10
- **SDI Inputs**: Format display with signal detection feedback
- **Video Status**: Input/Output format display per channel
- **Freeze**: Toggle freeze per channel with feedback
- **Test Pattern**: Toggle test pattern per channel
- **Reference**: Genlock source buttons and status display
- **HDR Transform**: Quick-select transform mode buttons (FS4/FS-HDR)
- **Dynamic Range**: IN/OUT dynamic range shortcuts (FS4/FS-HDR)
- **HDR Color**: Reset and SDR Preview buttons (FS4/FS-HDR)
- **HDR Status**: Per-channel HDR mode display (FS4/FS-HDR)
