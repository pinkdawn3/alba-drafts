import BookSearch from "./BookSearch/BookSearch";

function BookDashboard() {
  return (
    <section className="flex items-center flex-col ">
      <h2 className="p-5 font-bold text-2xl text-font">Book Tracker</h2>
      <BookSearch />
    </section>
  );
}

export default BookDashboard;
