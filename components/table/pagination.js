export default function Pagination({data}) {

  const handleCountPage = data => {
    if (!data) return;
    let numPage = [1];
    for (let i = 1; i < data.length; i++) {
      if (data.length > i * 10) {
        numPage.push(i + 1)
      }
    }
    return numPage;
  };

  const numberPagination = handleCountPage(data);

  return (
    <div className="pagination rounded-xl">
      <p>Showing 1 to {data.length} of entries</p>
      <div className="num_pagination">
        <div className="item_pagination">
          <p>Previous</p>
          <a>1</a>
          <p>Next</p>
        </div>
      </div>
    </div>
  )
}
