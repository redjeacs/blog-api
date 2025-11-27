function Errors({ errors }) {
  return (
    <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 text-red-600 py-8">
      {errors}
    </div>
  );
}

export default Errors;
