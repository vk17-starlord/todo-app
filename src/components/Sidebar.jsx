import { useState } from 'react';
import Categories from './tasks/Categories';
import useCategoryContext from './hooks/useCategoryContext';
import { v4 as uuidv4 } from 'uuid';
function Sidebar() {
    const [category, setcategory] = useState('');
    const updateCategory = (ev) => {
        const val = ev.target.value;
        setcategory(val);
    };
    const categoryContext = useCategoryContext();
    const addCategory = () => {
        if (category.length > 0) {
            const newItem = {
                id: uuidv4(),
                name: category
            };
            categoryContext.addCategory(newItem);
            setcategory('');
        }
    };

    return (
        <div className="sidebar">
            <h2 className="logo">
                <i className="bx bxl-sketch"></i> TaskTrail
            </h2>
            <Categories />
            <div className="input-category">
                <input
                    value={category}
                    onChange={updateCategory}
                    autoFocus
                    placeholder="Add Category"
                    type="text"
                />
                <button className="add-btn" onClick={addCategory}>
                    <i className="bx bxs-add-to-queue"></i>
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
