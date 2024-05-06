const IdPage = ({
  params, // { id: string }
}: {
  params: {
    id: string;
  };
}) => {
  return <div>Id: {params.id}</div>;
};
export default IdPage;
