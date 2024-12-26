// import pageNotFound from "../assets/img/pageNotFound.png";
// import Button from "../components/ui/Button";

const PageNotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center h-screen">
        <div className="m-auto text-center text-[#E48700]">
          <h1 className="text-xl font-semibold">404</h1>
          <p>Page Not Found</p>
          {/* <img src={pageNotFound} /> */}
          {/* <Button
            fullWidth={false}
            className="px-2"
            onClick={() => location.replace("/")}
          >
            Go to Home
          </Button> */}
        </div>
      </div>
    </>
  );
};
export default PageNotFound;