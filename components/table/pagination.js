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
    <div className="pagination">
      <p className='pagination__entries'>Hiển thị 1 đến {data.length} của danh sách</p>
      <div className="pagination__num">
        <div className="pagination__num__item">
          <p>Trước</p>
          <a>1</a>
          <p>Tiếp</p>
        </div>
      </div>
    </div>
  )
}
