import { useState } from 'react';
import useCategoryContext from '../hooks/useCategoryContext';

function Categories() {
    const categoryContext = useCategoryContext();
    const [removing, setRemoving] = useState([]); // State to track items being removed
    const removeCategory = (id) => {
        setRemoving([...removing, id]); // Mark the item as being removed
        setTimeout(() => {
            categoryContext.removeCategory(id);
        }, 500);
    };
    return (
        <div className="w-full">
            {categoryContext.categories.length > 0 ? (
                categoryContext.categories.map((ele) => {
                    const isRemoving = removing.includes(ele.id);
                    const className = `category ${isRemoving ? 'fadeOut' : ''}`; // Apply fade-out if needed

                    return (
                        <div className={className} key={ele.id}>
                            <p> {ele.name} </p>
                            <button onClick={() => removeCategory(ele.id)}>
                                <i className="bx bx-x"></i>
                            </button>
                        </div>
                    );
                })
            ) : (
                <div className="not-found">
                    <h2>No Categories Found</h2>
                </div>
            )}
        </div>
    );
}

export default Categories;
