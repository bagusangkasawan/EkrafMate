import React from 'react';

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                {title && <h2 className="text-xl font-semibold mb-3">{title}</h2>}
                <p className="text-gray-700 mb-6">{message}</p>
                <div className="flex justify-end gap-3">
                    <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={onCancel}>
                        Batal
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={onConfirm}>
                        Hapus
                    </button>
                </div>
            </div>`
        </div>
    );
}

export default ConfirmDialog;
