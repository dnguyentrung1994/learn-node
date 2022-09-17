export const MyTableHeader = (props) => {
  const { data } = props;

  const headerLists = Object.keys(data[0]);

  return (
    <thead>
      <tr>
        {headerLists.map((header) => (
          <th>{header}</th>
        ))}
      </tr>
    </thead>
  );
};
