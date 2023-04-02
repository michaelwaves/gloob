import { charityData } from "./CharityData";
import Tree from "./Tree";


export default function Trees(props) {
    const trees = charityData.slice(6).map((charity, i) => {
        return (
        <Tree
            key={i}
            position={charity.position}
            link={charity.url}
            rotation={charity.rotation}
            scale={charity.scale}
        />
        );
    });
    return <group {...props}>{trees}</group>;
    }