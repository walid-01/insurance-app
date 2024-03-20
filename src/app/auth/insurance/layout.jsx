export default function InsuranceAuthLayout({ children, login, register }) {
  return (
    <>
      <div>{children}</div>
      <div className="flex">
        <div>{login}</div>
        <div>{register}</div>
      </div>
    </>
  );
}
