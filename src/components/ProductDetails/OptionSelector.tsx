import * as React from 'react';
import * as styles from './ProductDetails.scss';
import { v4 } from 'node-uuid';
import { ProductOption } from '../../typings/model';

interface OptionSelectorCommonProps {
  label: string
  inputName: string
  compareWith: string | number
}

interface SelectorWithColorProps {
  options: ProductOption[]
  onSelect: (value: ProductOption) => void
}

interface CommonSelectorProps {
  options: Array<string | number>
  onSelect: (value: string | number) => void
}

type OptionSelectorProps =  OptionSelectorCommonProps & (
  SelectorWithColorProps | CommonSelectorProps
)

export const OptionSelector: React.FC<any> = props => {
  const { options, label, inputName, onSelect, compareWith } = props;
  return options ? (
    <div className={styles.optionsContainer}>
      <span className={styles.optionSelectorLabel}>{label}</span>
      {options.map((option: any) => {
        const insertedOption = option.color ? option.color : option;
        return(
          <React.Fragment key={v4()}>
            <input type="radio" id={insertedOption} value={insertedOption} name={inputName}
                  onChange={() => onSelect(option)}
                  checked={compareWith === insertedOption} />
            <label htmlFor={insertedOption} className={styles.selectableOption}>
              {option.color ? (
                <span className={styles.colorLabel} style={{backgroundColor: insertedOption}}></span>
              ) : null}
              <span className={styles.textLabel}>{insertedOption}</span>
            </label>
          </React.Fragment>
        )
      })}
    </div>
  ) : null
}