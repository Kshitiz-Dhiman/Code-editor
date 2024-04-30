import React from "react";
import { LANGUAGE_VERSIONS } from "../Language";

const languages = Object.entries(LANGUAGE_VERSIONS);
const LanguageSelector = ({ onSelect, language }) => {
  return (
    <div className="my-5">
      <select
        className="select w-full max-w-xs"
        name="language"
        id="language"
        value={language}
        onChange={(event) => {
          onSelect(event.target.value);
        }}
      >
        {languages.map(([language, version]) => (
          <option key={language} value={language}>
            {language}
            &nbsp;{version}
          </option>
        ))}
      </select>
    </div>
  );
};
export default LanguageSelector;
