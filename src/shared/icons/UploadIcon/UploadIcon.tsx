interface UploadIconProps {
    active?: boolean;
}

export const UploadIcon = ({ active }: UploadIconProps) => (
    <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" stroke="#a4a4a4" style={active ? { opacity: 0.5 } : {}} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <path d="M3 12.3v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="m7.9 6.7 4.1-4 4.1 4"/>
            <path d="M12 16.3V4.8"/>
        </g>
    </svg>
);