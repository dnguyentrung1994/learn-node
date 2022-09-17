export const MyTableBody = (props) => {
  const { data } = props;

  return (
    <tbody>
      {data.map((row) => (
        <tr>
          {Object.values(row).map((cell) => {
            const isLink = (content) => content.includes("http://");
            return isLink(cell) ? (
              <td>
                <a href={cell} target={"_blank"} rel="noreferrer">
                  {cell.split("/").at(-1).split(".")[0].replace(/^0+/, "")}
                </a>
              </td>
            ) : (
              <td>{cell}</td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};
