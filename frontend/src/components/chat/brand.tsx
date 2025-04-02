import chatBrand from "../../assets/icons8-chat-brand.png";

const Brand = () => {
  return (
    <>
      <div className="flex flex-col not-sm:h-60 not-sm:w-60">
        <label className="text-6xl ms-7">Chatty</label>
        <label className="mt-2">One click away from your friends</label>
      </div>
      <img className="h-10 w-10" src={chatBrand} />
    </>
  );
};

export default Brand;
