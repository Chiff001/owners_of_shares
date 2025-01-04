import { useTable } from "react-table";
import React from "react";
import { Table } from "reactstrap";

const CustomTable = ({ columns, data, onClick }) => {
    const {
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data
    });

    const onTdClicked = (row, e) => {
        if (e.target.tagName !== "BUTTON") {
            onClick(row.values.id);
        }
    };

    return (
        <div>
            {/* Заголовки таблицы (горизонтально) */}
            <div style={{
                display: "flex",
                marginBottom: "8px",
                backgroundColor: "#f4f4f4",
                padding: "8px",
                borderBottom: "2px solid #ddd",
            }}>
                {headerGroups.map(headerGroup => (
                    headerGroup.headers.map((column, index) => (
                        <div
                            {...column.getHeaderProps()}
                            key={column.getHeaderProps().key}
                            style={{
                                flex: index === 0 ? 0.2 : [1].includes(index) ? 1.05 : [3, 5].includes(index) ? 1.4 : 1, // Первый столбец - 0.2, 4, 5, 6 - 1.4
                                fontWeight: "bold",
                                padding: "8px",
                                textAlign: "center",  // Выравнивание заголовков по центру
                                borderRight: "1px solid #ddd", // Разделитель между заголовками
                                whiteSpace: "nowrap",
                            }}
                        >
                            {column.render('Header')}
                        </div>
                    ))
                ))}
            </div>

            {/* Данные строк (горизонтально) */}
            {rows.map((row, i) => {
                prepareRow(row);
                return (
                    <div
                        {...row.getRowProps()}
                        key={row.getRowProps().key}
                        onClick={(e) => onTdClicked(row, e)}
                        style={{
                            display: "flex",
                            marginBottom: "8px",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "8px",
                            cursor: "pointer",
                            alignItems: "center",
                        }}
                    >
                        {row.cells.map((cell, index) => {
                            let cellStyle = {
                                flex: 1,
                                padding: "8px",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                borderRight: "1px solid #ddd", // Разделитель между ячейками
                            };

                            // Устанавливаем ширину столбцов
                            if (index === 0) {
                                cellStyle = { ...cellStyle, flex: 0.2 };  // Первый столбец (уже)
                            } else if ([3, 4, 5].includes(index)) {
                                cellStyle = { ...cellStyle, flex: 1.4 };  // 4, 5 и 6 столбцы (шире)
                            }

                            return (
                                <div
                                    {...cell.getCellProps()}
                                    key={cell.getCellProps().key}
                                    style={cellStyle}
                                >
                                    {cell.column.id === 'id' ? i + 1 : cell.render('Cell')}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default CustomTable;
