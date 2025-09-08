/**
 * @fileoverview QuestionCard component for rendering a single questionnaire item.
 * Supports number, integer stepper, and boolean inputs. Includes category icon,
 * question text, input field, and hint row with info icon.
 */

import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import colors from "../../../theme/colors";
import BoolInput from "../QuestionTypes/BoolInput";
import EnumRangeInput from "../QuestionTypes/EnumRangeInput";
import NumberInput from "../QuestionTypes/NumberInput";
import SelectEnumInput from "../QuestionTypes/SelectEnumInput";
import StepperInput from "../QuestionTypes/StepperInput";
import styles from "./styles";

/**
 * Mapping of question_id to corresponding MaterialIcon and background color.
 * @constant {Object.<number, {name: string, bg: string}>}
 */
const questionIconMap = {
  1: { name: "lightbulb-outline", bg: colors.eco.green[500] },
  2: { name: "people", bg: colors.eco.blue },
  3: { name: "local-fire-department", bg: colors.eco.yellow },
  4: { name: "directions-car", bg: colors.eco.blue },
  5: { name: "speed", bg: colors.eco.purple },
  6: { name: "local-gas-station", bg: colors.eco.yellow },
  9: { name: "train", bg: colors.eco.green[500] },
  12: { name: "shopping-cart", bg: colors.eco.blue },
  13: { name: "restaurant-menu", bg: colors.eco.purple },
  default: { name: "help-outline", bg: colors.neutral.gray600 },
};

/**
 * @component QuestionCard
 * @param {Object} props - Component props
 * @param {Object} props.question - The current question object
 * @param {any} props.value - Current answer value
 * @param {Function} props.setValue - Setter for updating the answer value
 * @returns {JSX.Element}
 */
const QuestionCard = ({ question, value, setValue }) => {
  const renderInput = () => {
    switch (question.input_type) {
      case "number":
        return (
          <NumberInput
            value={value}
            onChange={setValue}
            placeholder="A$ 0.00"
          />
        );
      case "number_int":
        return <StepperInput value={value} onChange={setValue} min={0} />;
      case "bool":
        return <BoolInput value={value} onChange={setValue} />;
      case "enum_range":
        return (
          <EnumRangeInput
            value={value}
            onChange={setValue}
            options={question.options}
          />
        );
      case "select_enum":
        return (
          <SelectEnumInput
            value={value}
            onChange={setValue}
            options={question.options}
          />
        );
      default:
        return (
          <Text style={{ color: "red" }}>
            Unsupported input type: {question.input_type}
          </Text>
        );
    }
  };

  const { name, bg } =
    questionIconMap[question.question_id] || questionIconMap.default;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconWrapper, { backgroundColor: bg }]}>
          <MaterialIcons name={name} size={28} color={colors.neutral.white} />
        </View>
        <Text style={styles.question}>{question.text_en}</Text>
      </View>

      {renderInput()}

      {question.question_hint && (
        <View style={styles.hintRow}>
          <MaterialIcons
            name="info"
            size={16}
            color={colors.eco.blue}
            style={{ marginTop: 2 }}
          />
          <Text style={styles.hintText}>{question.question_hint}</Text>
        </View>
      )}
    </View>
  );
};

export default QuestionCard;
