---
title: PhotoChangeModal
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: PhotoChangeModal.tsx
---

# PhotoChangeModal

```tsx
import ModalContainer from "@/components/ModalContainer";
import icPhotoExampleCorrect1 from "@/assets/images/photo/ic_photo_example_correct_1.webp";
import icPhotoExampleError1 from "@/assets/images/photo/ic_photo_example_error_1.webp";
import icPhotoExampleError2 from "@/assets/images/photo/ic_photo_example_error_2.webp";
import icPhotoExampleError3 from "@/assets/images/photo/ic_photo_example_error_3.webp";
import icPhotoExampleError4 from "@/assets/images/photo/ic_photo_example_error_4.webp";

interface PhotoChangeModalProps {
  open: boolean;
  onClose: () => void;
  onChooseFromAlbum: () => void;
  onTakePhoto: () => void;
}

export default function PhotoChangeModal({ open, onClose, onChooseFromAlbum, onTakePhoto }: PhotoChangeModalProps) {
  return (
    <ModalContainer open={open} onClose={onClose} variant="bottom-sheet">
      <div className="w-full overflow-hidden rounded-t-3xl bg-white">
        <h3 className="m-0 pt-4 pb-8 text-[20px] text-black text-center">Photo Requirement</h3>
        <div className="flex justify-center px-6">
          <img
            src={icPhotoExampleCorrect1}
            alt="Correct example"
            className="w-[200px] h-[200px] rounded-3xl object-cover"
          />
        </div>
        <p className="w-full mt-4 px-6 text-black text-base text-left">Invalid photos</p>
        <div className="grid grid-cols-4 w-full mt-2 px-6 gap-2">
          {[
            { label: "Impersonation", img: icPhotoExampleError1 },
            { label: "Unclear", img: icPhotoExampleError2 },
            { label: "Covered", img: icPhotoExampleError3 },
            { label: "Non-Portrait", img: icPhotoExampleError4 },
          ].map(({ label, img }) => (
            <div key={label} className="flex flex-col items-center">
              <div className="relative w-full">
                <img src={img} alt={label} className="w-full aspect-square rounded-xl object-cover" />
                <div className="absolute top-1.5 right-1.5 w-6 h-6 flex items-center justify-center bg-[#FF3B30] rounded-full">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <p className="mt-1.5 text-black font-normal text-[11px] text-center leading-tight">{label}</p>
            </div>
          ))}
        </div>

        <button
          className="flex items-center justify-center w-[calc(100%-48px)] h-14 mt-4 mx-6 mb-2 border-none rounded-full bg-gradient-to-b from-[#5aa9ff] to-[#007afe] text-white text-[17px]"
          onClick={onChooseFromAlbum}
          type="button"
        >
          Choose from Album
        </button>
        <button
          className="flex justify-center items-center w-full h-11 mb-5 border-none bg-transparent text-[rgba(15,131,254,1)] font-normal text-[17px]"
          onClick={onTakePhoto}
          type="button"
        >
          Take Photo
        </button>
      </div>
    </ModalContainer>
  );
}

```
