const BASE_URL = 'https://dog.ceo/api';

export async function fetchAllBreeds() {
  const res = await fetch(`${BASE_URL}/breeds/list/all`);
  const data = await res.json();
  const breeds = [];
  for (const [breed, subBreeds] of Object.entries(data.message)) {
    if (subBreeds.length === 0) {
      breeds.push(breed);
    } else {
      for (const sub of subBreeds) {
        breeds.push(`${sub} ${breed}`);
      }
    }
  }
  return breeds;
}

export async function fetchRandomDogByBreed(breed) {
  // API expects "breed/sub" format, e.g. "hound/afghan" for "afghan hound"
  const parts = breed.split(' ');
  const apiPath = parts.length > 1
    ? `${parts[parts.length - 1]}/${parts.slice(0, -1).join('')}`
    : breed;
  const res = await fetch(`${BASE_URL}/breed/${apiPath}/images/random`);
  const data = await res.json();
  return data.message;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export async function generateQuestion(allBreeds) {
  const correctBreed = allBreeds[Math.floor(Math.random() * allBreeds.length)];
  const imageUrl = await fetchRandomDogByBreed(correctBreed);

  const wrongBreeds = shuffle(allBreeds.filter(b => b !== correctBreed)).slice(0, 3);
  const options = shuffle([correctBreed, ...wrongBreeds]);

  return { correctBreed, imageUrl, options };
}
