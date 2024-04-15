type suggestions = {
  address: string;
  placeId: string;
  city: string;
  state: string;
  country: string;
};
export async function autoComplete(
  input: string
): Promise<suggestions[] | null> {
  try {
    const payload = {
      input,
      locationBias: {
        circle: {
          center: {
            latitude: "48.7988296",
            longitude: "-95.3421687",
          },
          radius: "500.0",
        },
      },
    };

    // Set the headers
    const headers = {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": "AIzaSyA0i6pUgKu9bNTdR_PKL7Pk-8MjDEsZwL8",
    };

    // Make the POST request
    const url = "https://places.googleapis.com/v1/places:autocomplete";
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    // const suggestions = data?.suggestions.map(
    //   (item: any) => item.placePrediction.structuredFormat.mainText.text
    // );

    const suggestions = data?.suggestions.map((item: any) => {
      const parts =
        item.placePrediction.structuredFormat.secondaryText.text.split(",");
      return {
        address: item.placePrediction.structuredFormat.mainText.text,
        placeId: item.placePrediction.placeId,
        city: parts[0],
        state: parts[1],
        country: parts[2],
      };
    });
    console.log(data);

    return suggestions;
  } catch (error) {
    console.error(error);
    return null;
  }
}
