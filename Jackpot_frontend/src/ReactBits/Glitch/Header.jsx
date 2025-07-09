import GlitchText from "./GlitchText.jsx";

export default function Header() {
    return (
        <header className="app-header">
            <GlitchText
                speed={1.5}
                enableShadows={true}
                enableOnHover={true}
            >
                Jackpot
            </GlitchText>

        </header>
    );
}
