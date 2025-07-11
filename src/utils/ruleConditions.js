// Defined condition objects for type safety and consistency
export const CONDITIONS = {
    EQUALS: { value: 'equals', label: 'equals' },
    CONTAINS: { value: 'contains', label: 'contains' },
    GREATER_THAN: { value: 'greater_than', label: 'is greater than' },
    LESS_THAN: { value: 'less_than', label: 'is less than' },
    EXISTS: { value: 'exists', label: 'exists' },
    EMPTY: { value: 'empty', label: 'is empty' }
};

// Get condition label by value
export const getConditionLabel = (conditionValue) => {
    const condition = Object.values(CONDITIONS).find(c => c.value === conditionValue);
    return condition ? condition.label : CONDITIONS.EQUALS.label;
};

// Condition options for dropdowns
export const conditionOptions = Object.values(CONDITIONS);