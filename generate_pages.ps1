$services = @(
    @{ id="video-editing"; title="Video Editing"; icon="🎥"; desc="Professional, cinematic video editing for YouTube, commercials, and social content." },
    @{ id="graphics-design"; title="Graphics & Design"; icon="🎨"; desc="Stunning visual identities, branding, and custom illustrations tailored to you." },
    @{ id="livestreaming"; title="Livestreaming"; icon="📡"; desc="High-quality broadcast setups and management for Twitch, YouTube, and events." },
    @{ id="social-media"; title="Social Media"; icon="📱"; desc="Strategic management and content creation to grow your online community." },
    @{ id="photoshop"; title="Photoshop"; icon="🖼️"; desc="Expert photo retouching, compositing, and manipulation services." },
    @{ id="web-development"; title="Web Development"; icon="💻"; desc="Custom, high-performance websites built with modern technologies." },
    @{ id="web-hosting"; title="Web Hosting"; icon="☁️"; desc="Fast, secure, and reliable hosting solutions to keep your site online 24/7." },
    @{ id="seo-management"; title="SEO Management"; icon="📈"; desc="Data-driven strategies to boost your search rankings and drive organic traffic." }
)

New-Item -ItemType Directory -Force -Path "services" | Out-Null

foreach ($s in $services) {
    $content = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$($s.title) | VectroSpark Services</title>
    <link rel="stylesheet" href="../style.css">
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">
</head>
<body>
    <div id="navbar-placeholder"></div>

    <section class="section hero" style="min-height: 60vh; padding-top: 150px;">
        <div class="container" style="text-align: center; position: relative; z-index: 10;">
            <div style="font-size: 5rem; margin-bottom: 1rem;">$($s.icon)</div>
            <h1 class="gradient-text" style="font-size: 3.5rem; margin-bottom: 1rem;">$($s.title)</h1>
            <p style="font-size: 1.2rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto 2rem;">$($s.desc)</p>
            <a href="../contact.html" class="btn-primary">Request This Service</a>
        </div>
        <div class="hero-visual animate-fade">
            <div class="glow-orb orb-1"></div>
        </div>
    </section>

    <div id="footer-placeholder"></div>

    <script src="../components.js"></script>
    <script src="../script.js"></script>
</body>
</html>
"@
    Set-Content -Path "services\$($s.id).html" -Value $content -Encoding UTF8
}
