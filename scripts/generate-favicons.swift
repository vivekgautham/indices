import Cocoa

func renderFavicon(size: CGFloat) -> Data? {
    let px = Int(size)
    guard let rep = NSBitmapImageRep(
        bitmapDataPlanes: nil,
        pixelsWide: px,
        pixelsHigh: px,
        bitsPerSample: 8,
        samplesPerPixel: 4,
        hasAlpha: true,
        isPlanar: false,
        colorSpaceName: .deviceRGB,
        bytesPerRow: 0,
        bitsPerPixel: 0
    ) else {
        return nil
    }

    rep.size = NSSize(width: size, height: size)

    NSGraphicsContext.saveGraphicsState()
    guard let context = NSGraphicsContext(bitmapImageRep: rep) else {
        NSGraphicsContext.restoreGraphicsState()
        return nil
    }
    NSGraphicsContext.current = context
    let cgContext = context.cgContext

    cgContext.setAllowsAntialiasing(true)
    cgContext.setShouldAntialias(true)
    cgContext.interpolationQuality = .high

    let rect = CGRect(origin: .zero, size: CGSize(width: size, height: size))
    let cornerRadius = size * 0.22

    // 1. Background Rounded Rect with Indigo -> Violet -> Pink Gradient
    let bgPath = NSBezierPath(roundedRect: rect, xRadius: cornerRadius, yRadius: cornerRadius)
    bgPath.addClip()

    let colorSpace = CGColorSpaceCreateDeviceRGB()
    let colors = [
        NSColor(red: 79/255.0, green: 70/255.0, blue: 229/255.0, alpha: 1.0).cgColor, // Indigo #4f46e5
        NSColor(red: 124/255.0, green: 58/255.0, blue: 237/255.0, alpha: 1.0).cgColor, // Violet #7c3aed
        NSColor(red: 236/255.0, green: 72/255.0, blue: 153/255.0, alpha: 1.0).cgColor  // Pink #ec4899
    ] as CFArray
    let locations: [CGFloat] = [0.0, 0.55, 1.0]
    if let gradient = CGGradient(colorsSpace: colorSpace, colors: colors, locations: locations) {
        cgContext.drawLinearGradient(gradient,
                                     start: CGPoint(x: 0, y: size),
                                     end: CGPoint(x: size, y: 0),
                                     options: [])
    }

    // 2. Subtle glossy top highlight
    let highlightColors = [
        NSColor(white: 1.0, alpha: 0.16).cgColor,
        NSColor(white: 1.0, alpha: 0.0).cgColor
    ] as CFArray
    if let highlightGrad = CGGradient(colorsSpace: colorSpace, colors: highlightColors, locations: [0.0, 1.0]) {
        cgContext.drawLinearGradient(highlightGrad,
                                     start: CGPoint(x: 0, y: size),
                                     end: CGPoint(x: size, y: size * 0.5),
                                     options: [])
    }

    // 3. Inner border
    let borderPath = NSBezierPath(roundedRect: rect.insetBy(dx: max(0.5, size * 0.015), dy: max(0.5, size * 0.015)),
                                  xRadius: cornerRadius * 0.92,
                                  yRadius: cornerRadius * 0.92)
    NSColor(white: 1.0, alpha: 0.22).setStroke()
    borderPath.lineWidth = max(1.0, size * 0.025)
    borderPath.stroke()

    // 4. Draw 3 Ascending Benchmark Columns (Bar Chart)
    let barWidth = size * 0.14
    let barRadius = max(1.0, barWidth * 0.32)
    let baselineY = size * 0.20

    // Bar 1 (Left - Smallest)
    let bar1Height = size * 0.30
    let bar1Rect = CGRect(x: size * 0.20, y: baselineY, width: barWidth, height: bar1Height)
    let bar1Path = NSBezierPath(roundedRect: bar1Rect, xRadius: barRadius, yRadius: barRadius)
    NSColor(white: 1.0, alpha: 0.65).setFill()
    bar1Path.fill()

    // Bar 2 (Middle)
    let bar2Height = size * 0.46
    let bar2Rect = CGRect(x: size * 0.43, y: baselineY, width: barWidth, height: bar2Height)
    let bar2Path = NSBezierPath(roundedRect: bar2Rect, xRadius: barRadius, yRadius: barRadius)
    NSColor(white: 1.0, alpha: 0.82).setFill()
    bar2Path.fill()

    // Bar 3 (Right - Tallest)
    let bar3Height = size * 0.60
    let bar3Rect = CGRect(x: size * 0.66, y: baselineY, width: barWidth, height: bar3Height)
    let bar3Path = NSBezierPath(roundedRect: bar3Rect, xRadius: barRadius, yRadius: barRadius)
    NSColor(white: 1.0, alpha: 0.98).setFill()
    bar3Path.fill()

    // 5. Upward Trend Polyline with Emerald/Green Accent
    let trendPath = NSBezierPath()
    trendPath.move(to: CGPoint(x: size * 0.16, y: size * 0.46))
    trendPath.line(to: CGPoint(x: size * 0.39, y: size * 0.56))
    trendPath.line(to: CGPoint(x: size * 0.58, y: size * 0.50))
    trendPath.line(to: CGPoint(x: size * 0.82, y: size * 0.80))

    trendPath.lineWidth = max(1.8, size * 0.075)
    trendPath.lineCapStyle = .round
    trendPath.lineJoinStyle = .round
    NSColor(red: 52/255.0, green: 211/255.0, blue: 153/255.0, alpha: 1.0).setStroke() // Vibrant emerald #34d399
    trendPath.stroke()

    // Peak Accent Dot
    let dotRadius = max(2.0, size * 0.065)
    let dotRect = CGRect(x: size * 0.82 - dotRadius, y: size * 0.80 - dotRadius, width: dotRadius * 2, height: dotRadius * 2)
    let dotPath = NSBezierPath(ovalIn: dotRect)
    NSColor.white.setFill()
    dotPath.fill()

    NSGraphicsContext.restoreGraphicsState()

    return rep.representation(using: .png, properties: [:])
}

let sizes: [(CGFloat, String)] = [
    (16, "favicon-16x16.png"),
    (32, "favicon-32x32.png"),
    (48, "favicon-48x48.png"),
    (96, "favicon-96x96.png"),
    (180, "apple-touch-icon.png"),
    (192, "favicon-192x192.png"),
    (512, "favicon-512x512.png")
]

let publicDir = URL(fileURLWithPath: "public")

for (size, filename) in sizes {
    if let data = renderFavicon(size: size) {
        let fileURL = publicDir.appendingPathComponent(filename)
        try? data.write(to: fileURL)
        print("✓ Generated \(filename) (\(Int(size))x\(Int(size)), \(data.count) bytes)")
    } else {
        print("❌ Failed to render \(filename)")
    }
}

// Generate multi-resolution favicon.ico (16, 32, 48)
var icoImages: [(width: UInt8, height: UInt8, data: Data)] = []
for s in [16, 32, 48] {
    if let d = renderFavicon(size: CGFloat(s)) {
        icoImages.append((width: UInt8(s), height: UInt8(s), data: d))
    }
}

if !icoImages.isEmpty {
    var icoData = Data()
    var reserved: UInt16 = 0
    var type: UInt16 = 1
    var count: UInt16 = UInt16(icoImages.count)
    icoData.append(Data(bytes: &reserved, count: 2))
    icoData.append(Data(bytes: &type, count: 2))
    icoData.append(Data(bytes: &count, count: 2))

    let headerSize = 6
    let dirEntrySize = 16
    var offset = UInt32(headerSize + dirEntrySize * icoImages.count)

    for img in icoImages {
        var w = img.width
        var h = img.height
        var palette: UInt8 = 0
        var res: UInt8 = 0
        var planes: UInt16 = 1
        var bpp: UInt16 = 32
        var size = UInt32(img.data.count)
        var off = offset

        icoData.append(Data(bytes: &w, count: 1))
        icoData.append(Data(bytes: &h, count: 1))
        icoData.append(Data(bytes: &palette, count: 1))
        icoData.append(Data(bytes: &res, count: 1))
        icoData.append(Data(bytes: &planes, count: 2))
        icoData.append(Data(bytes: &bpp, count: 2))
        icoData.append(Data(bytes: &size, count: 4))
        icoData.append(Data(bytes: &off, count: 4))

        offset += size
    }

    for img in icoImages {
        icoData.append(img.data)
    }

    let icoURL = publicDir.appendingPathComponent("favicon.ico")
    try? icoData.write(to: icoURL)
    print("✓ Generated favicon.ico (\(icoData.count) bytes)")
}
