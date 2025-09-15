import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	isOpen: boolean;
	onToggle: () => void;
	formSettings: ArticleStateType;
	onFormSettingsChange: (settings: ArticleStateType) => void;
	onApply: () => void;
	onReset: () => void;
}

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	formSettings,
	onFormSettingsChange,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const handleFontFamilyChange = (option: (typeof fontFamilyOptions)[0]) => {
		console.log('Изменен шрифт:', option);
		onFormSettingsChange({ ...formSettings, fontFamilyOption: option });
	};

	const handleFontColorChange = (option: (typeof fontColors)[0]) => {
		console.log('Изменен цвет текста:', option);
		onFormSettingsChange({ ...formSettings, fontColor: option });
	};

	const handleBackgroundColorChange = (
		option: (typeof backgroundColors)[0]
	) => {
		console.log('Изменен цвет фона:', option);
		onFormSettingsChange({ ...formSettings, backgroundColor: option });
	};

	const handleContentWidthChange = (option: (typeof contentWidthArr)[0]) => {
		console.log('Изменена ширина контента:', option);
		onFormSettingsChange({ ...formSettings, contentWidth: option });
	};

	const handleFontSizeChange = (option: (typeof fontSizeOptions)[0]) => {
		console.log('Изменен размер шрифта:', option);
		onFormSettingsChange({ ...formSettings, fontSizeOption: option });
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					<h1 className={styles.title}>ЗАДАЙТЕ ПАРАМЕТРЫ</h1>

					<Select
						title='ШРИФТ'
						selected={formSettings.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
					/>

					<Separator />

					<Select
						title='ЦВЕТ ШРИФТА'
						selected={formSettings.fontColor}
						options={fontColors}
						onChange={handleFontColorChange}
					/>

					<Separator />

					<Select
						title='ЦВЕТ ФОНА'
						selected={formSettings.backgroundColor}
						options={backgroundColors}
						onChange={handleBackgroundColorChange}
					/>

					<Separator />

					<Select
						title='ШИРИНА КОНТЕНТА'
						selected={formSettings.contentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthChange}
					/>

					<Separator />

					<div className={styles.fontSizeGroup}>
						<div className={styles.fontSizeLabel}>РАЗМЕР ШРИФТА</div>
						<div className={styles.fontSizeButtons}>
							{fontSizeOptions.map((option) => (
								<button
									key={option.value}
									type='button'
									className={clsx(styles.fontSizeButton, {
										[styles.fontSizeButton_active]:
											formSettings.fontSizeOption.value === option.value,
									})}
									onClick={() => handleFontSizeChange(option)}>
									{option.title}
								</button>
							))}
						</div>
					</div>

					<div className={styles.bottomContainer}>
						<Button
							title='СБРОСИТЬ'
							htmlType='button'
							type='clear'
							onClick={onReset}
						/>
						<Button
							title='ПРИМЕНИТЬ'
							htmlType='button'
							type='apply'
							onClick={onApply}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
