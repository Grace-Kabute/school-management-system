import React from 'react';

const List = ({ items, fields, onAttendanceChange }) => {
  return (
    <div className="list-container">
      <table>
        <thead>
          <tr>
            {fields.map((field) => (
              <th key={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              {fields.map((field) => (
                <td key={field}>
                  {field === 'attendance' ? (
                    <input
                      type="checkbox"
                      checked={item.isPresent || false}
                      onChange={() => onAttendanceChange(item.id)}
                    />
                  ) : (
                    item[field]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
