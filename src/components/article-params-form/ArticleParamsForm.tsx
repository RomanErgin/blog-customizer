import { useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	onSettingsChange: (settings: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	onSettingsChange,
}: ArticleParamsFormProps) => {
	// Состояние сайдбара
	const [isOpen, setIsOpen] = useState(false);
	// Настройки в форме (могут отличаться от примененных)
	const [formSettings, setFormSettings] =
		useState<ArticleStateType>(defaultArticleState);
	// Ref для сайдбара
	const sidebarRef = useRef<HTMLDivElement>(null);

	const handleSidebarToggle = () => {
		setIsOpen(!isOpen);
	};

	// Закрытие сайдбара при клике снаружи
	useOutsideClickClose({
		isOpen,
		rootRef: sidebarRef,
		onChange: setIsOpen,
	});

	const handleFontFamilyChange = (option: (typeof fontFamilyOptions)[0]) => {
		console.log('Изменен шрифт:', option);
		setFormSettings({ ...formSettings, fontFamilyOption: option });
	};

	const handleFontColorChange = (option: (typeof fontColors)[0]) => {
		console.log('Изменен цвет текста:', option);
		setFormSettings({ ...formSettings, fontColor: option });
	};

	const handleBackgroundColorChange = (
		option: (typeof backgroundColors)[0]
	) => {
		console.log('Изменен цвет фона:', option);
		setFormSettings({ ...formSettings, backgroundColor: option });
	};

	const handleContentWidthChange = (option: (typeof contentWidthArr)[0]) => {
		console.log('Изменена ширина контента:', option);
		setFormSettings({ ...formSettings, contentWidth: option });
	};

	const handleFontSizeChange = (option: (typeof fontSizeOptions)[0]) => {
		console.log('Изменен размер шрифта:', option);
		setFormSettings({ ...formSettings, fontSizeOption: option });
	};

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log('Применяем настройки:', formSettings);
		onSettingsChange(formSettings);
		setIsOpen(false);
	};

	const handleFormReset = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log('Сбрасываем настройки на дефолтные:', defaultArticleState);
		setFormSettings(defaultArticleState);
		onSettingsChange(defaultArticleState);
		setIsOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleSidebarToggle} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<h1 className={styles.title}>ЗАДАЙТЕ ПАРАМЕТРЫ</h1>

					<Select
						title='ШРИФТ'
						selected={formSettings.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
					/>

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

					<Select
						title='ШИРИНА КОНТЕНТА'
						selected={formSettings.contentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthChange}
					/>

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
						<Button title='СБРОСИТЬ' htmlType='reset' type='clear' />
						<Button title='ПРИМЕНИТЬ' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
