import React, { FC, forwardRef, useCallback, useMemo } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  StyleObjectOrFn,
  Text,
  useTheme,
  css as chakraCSS,
} from '@chakra-ui/react';
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { ClassNames } from '@emotion/react';

const CustomInput = forwardRef<any, any>((props, ref) => {
  return (
    <InputGroup>
      <Input {...props} ref={ref} />
      <InputRightElement
        userSelect="none"
        pointerEvents="none"
        children={<CalendarIcon />}
      />
    </InputGroup>
  );
});

const CustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: any) => {
  return (
    <Stack pb={1} isInline alignItems="center" textAlign="left" pl={4} pr={2}>
      <Text color="gray.700" flex={1} fontSize="sm" fontWeight="medium">
        {new Intl.DateTimeFormat('en-AU', {
          year: 'numeric',
          month: 'long',
        }).format(date)}
      </Text>
      <IconButton
        borderRadius="full"
        size="sm"
        variant="ghost"
        aria-label="Previous Month"
        icon={<ChevronLeftIcon fontSize="14px" />}
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      />
      <IconButton
        borderRadius="full"
        size="sm"
        variant="ghost"
        aria-label="Next Month"
        icon={<ChevronRightIcon fontSize="14px" />}
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      />
    </Stack>
  );
};

function useDatePickerStyles() {
  const theme = useTheme();
  return useMemo(() => {
    const defaultStyles: StyleObjectOrFn = {
      p: 2,
      bg: 'white',
      border: '1px solid',
      borderColor: 'gray.100',
      boxShadow: 'sm',
      '& .react-datepicker': {
        '&__header': {
          bg: 'none',
          borderBottom: 'none',
        },
        '&__month': {
          mt: 0,
        },
        '&__day-name': {
          color: 'gray.400',
          fontWeight: 'medium',
          w: 7,
        },
        '&__day': {
          lineHeight: '28px',
          color: 'gray.700',
          w: 7,
          h: 7,
          borderRadius: 'full',
        },
        '&__day:not(.react-datepicker__day--selected, .react-datepicker__day--keyboard-selected):hover': {
          bg: 'white',
          boxShadow: '0 0 1px 1px rgba(0,0,0,0.2)',
        },
        '&__day--today': {
          bg: 'gray.100',
          fontWeight: '400',
        },
        '&__day--selected, &__day--keyboard-selected': {
          bg: 'gray.700',
          color: 'white',
        },
      },
    };
    return chakraCSS(defaultStyles)(theme);
  }, [theme]);
}

export interface DatePickerProps {
  value: Date;
  onChange: (date: Date | null) => void;
}

export const DatePicker: FC<DatePickerProps> = ({ value, onChange }) => {
  const styles = useDatePickerStyles();

  const render = useCallback(
    ({ css }) => {
      return (
        <ReactDatePicker
          dateFormat="dd MMMM, yyy"
          showPopperArrow={false}
          popperClassName={css({ marginTop: '4px!important' })}
          calendarClassName={css(styles)}
          selected={value}
          onChange={date =>
            Array.isArray(date) ? onChange(date[0]) : onChange(date)
          }
          customInput={<CustomInput />}
          renderCustomHeader={CustomHeader}
        />
      );
    },
    [styles, value]
  );

  return <ClassNames>{render}</ClassNames>;
};
