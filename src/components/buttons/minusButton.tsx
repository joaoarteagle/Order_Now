
export default function MinusButton({ onClick }: { onClick: () => void }) { 
    return <>
        <button className="w-17.5 h-15" onClick={onClick}>-</button>
    </>;

}