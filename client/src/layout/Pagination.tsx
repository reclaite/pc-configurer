import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page: number) => {
        onPageChange(page);
    };

    const renderPageLinks = () => {
        const pageLinks = [];

        // Добавление ссылки на первую страницу
        if (currentPage > 3) {
            pageLinks.push(
                <li key="first" className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(1)}>1</button>
                </li>
            );
        }

        // Добавление ссылки на предыдущую страницу
        pageLinks.push(
            <li key="previous" className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>&laquo;</button>
            </li>
        );

        // Добавление ссылок на соседние страницы
        for (let page = Math.max(1, currentPage - 2); page <= Math.min(totalPages, currentPage + 2); page++) {
            pageLinks.push(
                <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(page)}>{page}</button>
                </li>
            );
        }

        // Добавление ссылки на следующую страницу
        pageLinks.push(
            <li key="next" className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>&raquo;</button>
            </li>
        );

        // Добавление ссылки на последнюю страницу
        if (currentPage < totalPages - 2) {
            pageLinks.push(
                <li key="last" className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
                </li>
            );
        }

        return pageLinks;
    };

    return (
        <nav>
            <p className="text-center fw-bold">Выбор страницы</p>
            <ul className="pagination justify-content-center">
                {renderPageLinks()}
            </ul>
        </nav>
    );
};

export default Pagination;