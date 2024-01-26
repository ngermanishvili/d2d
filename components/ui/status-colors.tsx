// import React from "react";
// import { Chip } from "@nextui-org/react";

// export default function StatusColors() {
//     return (
//         <div className="flex gap-4">
//             <Chip color="default">Default</Chip>
//             <Chip color="primary">Primary</Chip>
//             <Chip color="secondary">Secondary</Chip>
//             <Chip color="success">Success</Chip>
//             <Chip color="warning">Warning</Chip>
//             <Chip color="danger">Danger</Chip>
//         </div>
//     );
// }




// StatusChip.tsx
import { Chip } from "@nextui-org/react";
import React from "react";

interface StatusChipProps {
    status: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({ status }) => {


    return (
        <Chip color="success">
            {status}
        </Chip>
    );
};
