
export default function PlusButton({ onClick }: { onClick: () => void }) { 
    return <>
        <button className="w-17.5 h-15" onClick={onClick}>+</button>
    </>;
}