"use client";

export default function ExpertAuthLayout({ children, login, register }) {
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
