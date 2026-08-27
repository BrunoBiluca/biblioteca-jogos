type Ratio = '1:1' | '4:3' | '16:9' | '3:2' | '5:4' | '8:1' | '2:35' | '1:85' | '21:9' | '9:16' | '3:4';

export const validateImageRatio = async (file: File, allowedRatio: Ratio[]): Promise<boolean> => {
  const image = await readImage(file);

  if (!image) {
    return false;
  }

  const { width, height } = image;
  const imageRatio = getAspectRatio(width, height);

  return allowedRatio.includes(imageRatio as Ratio);
};

function getAspectRatio(width: number, height: number): Ratio {
  const calculate = (a: number, b: number): number => (b === 0 ? a : calculate(b, a % b));

  return `${width / calculate(width, height)}:${height / calculate(width, height)}` as Ratio;
}

export const readImage = (file: File): Promise<HTMLImageElement | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const result = event.target?.result;
      const image = new Image();

      image.src = result as string;
      image.onload = () => {
        resolve(image);
      };

      image.onerror = () => {
        reject(new Error('Failed to load image'));
      };
    };
  });
};
