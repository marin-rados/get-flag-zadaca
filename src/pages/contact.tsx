import { useEffect, useState } from "react";

type CountryType = {
  flags: {
    png: string;
  };
};

const Contact = () => {
  const [country, setCountry] = useState<CountryType | undefined>(undefined);
  const [name, setName] = useState<string>();

  const getCountryFlag = async (name: string) => {
    await fetch(`https://restcountries.com/v3.1/name/${name}`)
      .then((data) => {
        return data.json();
      })
      .then((res: CountryType[]) => {
        setCountry(res[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCountryFlag("Croatia");
  }, []);

  return (
    <>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            console.log(name);
          }}
        />
        <button
          onClick={() => {
            getCountryFlag(name);
          }}
        >
          Get the flag
        </button>
      </div>
      <img src={country?.flags.png} alt="flag of a country" />
    </>
  );
};
export default Contact;
