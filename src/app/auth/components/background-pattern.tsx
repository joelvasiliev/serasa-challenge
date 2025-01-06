export function BackgroundPattern() {
    return (
        <div className="absolute inset-0 z-0">
            <svg
                className="absolute inset-0 h-full w-full"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
                viewBox="0 0 1440 800"
            >
                <defs>
                    <pattern id="dots" width="50" height="50" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="2" fill="#3B82F6" opacity="0.1" />
                    </pattern>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.1" />
                    </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#gradient)" />
                <rect width="100%" height="100%" fill="url(#dots)" />
                <path
                    d="M0,700 C300,800 400,600 500,750 C600,900 700,800 800,650 C900,500 1000,700 1200,750 L1440,750 L1440,800 L0,800 Z"
                    fill="#3B82F6"
                    opacity="0.1"
                />
            </svg>
        </div>
    )
}

