type Ratio =
  | '1:1'
  | '4:3'
  | '16:9'
  | '3:2'
  | '5:4'
  | '8:1'
  | '2:35'
  | '1:85'
  | '21:9'
  | '9:16'
  | '2:3'
  | '3:4'
  | '3:5';

export const validateImageRatio = async (
  file: File,
  allowedRatio: Ratio[],
  delta: number = 0,
): Promise<boolean> => {
  const image = await readImage(file);

  if (!image) {
    return false;
  }

  const { width, height } = image;
  const imageRatio = getAspectRatio(width, height);

  if (delta == 0) {
    return allowedRatio.includes(imageRatio as Ratio);
  }

  const [iw, ih] = imageRatio.split(':').map(Number);
  const imageRatioNumber = iw / ih;

  return allowedRatio.some((ratio) => {
    const [rw, rh] = ratio.split(':').map(Number);
    const targetRatio = rw / rh;
    const diff = Math.abs(imageRatioNumber - targetRatio);
    return diff < delta;
  });
};

function getAspectRatio(width: number, height: number): Ratio {
  const calculate = (a: number, b: number): number =>
    b === 0 ? a : calculate(b, a % b);

  const w = width / calculate(width, height);
  const h = height / calculate(width, height);

  return `${w}:${h}` as Ratio;
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
