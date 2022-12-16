import classes from './Select.module.scss';

export interface IOption {
    value: string;
    label: string;
}

interface ISelectProps {
    options: IOption[];
    initial: string;
    changeHandler: (e: any) => void
}

const Select: React.FC<ISelectProps> = ({options, initial, changeHandler}) => {
  return (
    <div className={classes.select}>
      <select value={initial || 'none'} onChange={(e) => changeHandler(e)}>
        <option value="" disabled>Select ...</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
};

export default Select;
