import { RefObject } from "react"

export const useDropdownPosition = (
    ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>
) => {
    const getDropdownPosition = () => {
        if(!ref.current) return { top:0 , left: 0};

        const rect = ref.current.getBoundingClientRect();
        const dropdownWidth = 240; // Đọ dài của dropdown 

        // Tính vị tris ban đầu
        let left = rect.left + window.scrollX;
        const top = rect.bottom + window.scrollY;

        // Kiểm tra vị trí dropdown
        if(left + dropdownWidth > window.innerHeight)
        {
            // Chỉnh vị trí sang phải 
            left= rect.right + window.scrollX - dropdownWidth

            // Nếu còn off-screen
            if (left < 0) {
                left = window.innerWidth -dropdownWidth - 16;
            };
        };
        // Đảm bảo dropdown không bị lố qua bên trái
        if (left < 0){
            left = 16;
        }

        return {top , left };
    };

    return { getDropdownPosition };
}