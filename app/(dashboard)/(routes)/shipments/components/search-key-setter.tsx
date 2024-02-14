interface ShipmentSearchDropdownProps {
    setSearchKey: React.Dispatch<React.SetStateAction<string>>;
}

export const ShipmentSearchDropdown: React.FC<ShipmentSearchDropdownProps> = ({
    setSearchKey,
}) => {
    const shipmentColumns: string[] = [
        "id",
        "mimgebiFullName",
        "gamgzavniFullName",
        "phoneNumber",
        "address",
        "city",
        "price",
        "brittle",
        "packaging",
        "createdAt",
        "updatedAt",
        "mimgebisNumber",
        "mimgebisAddress",
        "markedByCourier",
        "mimgebiQalaqi",
        "trackingId",
        "status",
        "courierComment",
        "agebisDro",
        "chabarebisDro",
    ];

    const handleChange = (selectedKey: string) => {
        setSearchKey(selectedKey);
    };

    return (
        <select
            onChange={(e) => handleChange(e.target.value)}
            className="border p-2 rounded-md"
        >
            <option value="">Select Search Key</option>
            {shipmentColumns.map((column) => (
                <option key={column} value={column}>
                    {column}
                </option>
            ))}
        </select>
    );
};