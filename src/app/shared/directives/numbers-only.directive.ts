import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[numbersOnly]',
    standalone: true
})
export class NumbersOnlyDirective {

    constructor(private el: ElementRef) { }

    @HostListener('input', ['$event'])
    onInputChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        const initialValue = input.value;

        // Remove any non-numeric characters except decimal point
        let newValue = initialValue.replace(/[^0-9.]/g, '');

        // Ensure only one decimal point
        const parts = newValue.split('.');
        if (parts.length > 2) {
            newValue = parts[0] + '.' + parts.slice(1).join('');
        }

        input.value = newValue;

        // If the value changed, dispatch an input event
        if (initialValue !== input.value) {
            input.dispatchEvent(new Event('input'));
        }
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        const allowedKeys = [
            'Backspace',
            'Tab',
            'End',
            'Home',
            'ArrowLeft',
            'ArrowRight',
            'Delete',
            '.',
            'Decimal' // For numpad decimal key
        ];

        // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        if (event.ctrlKey || event.metaKey) {
            return;
        }

        // Allow navigation keys and decimal point
        if (allowedKeys.includes(event.key)) {
            // Prevent multiple decimal points
            const input = event.target as HTMLInputElement;
            if (event.key === '.' || event.key === 'Decimal') {
                if (input.value.includes('.')) {
                    event.preventDefault();
                }
            }
            return;
        }

        // Prevent input if not a number
        if (event.key < '0' || event.key > '9') {
            event.preventDefault();
        }
    }

    @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent): void {
        event.preventDefault();
        const pastedInput = event.clipboardData?.getData('text/plain');

        if (pastedInput) {
            // Filter out non-numeric characters except decimal point
            let numericValue = pastedInput.replace(/[^0-9.]/g, '');

            // Ensure only one decimal point
            const parts = numericValue.split('.');
            if (parts.length > 2) {
                numericValue = parts[0] + '.' + parts.slice(1).join('');
            }

            // Check if input already has a decimal point
            const input = event.target as HTMLInputElement;
            if (input.value.includes('.') && numericValue.includes('.')) {
                numericValue = numericValue.replace('.', '');
            }

            document.execCommand('insertText', false, numericValue);
        }
    }
}