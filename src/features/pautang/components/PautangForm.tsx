import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import Input from "../../../components/forms/Input";
import Button from "../../../components/ui/Button";
import Typography from "../../../components/ui/Typography";

type FormValues = {
  customer: string;
  amount: string;
  contact: string;
  items: string;
  dueDate: string;
};

type SubmitValues = {
  customer: string;
  amount: number;
  contact: string;
  items: string;
  dueDate: string;
};

type Props = {
  onSubmit: (values: SubmitValues) => void;
  onClose: () => void;
};

export default function PautangForm({ onSubmit, onClose }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      customer: "",
      amount: "",
      contact: "",
      items: "",
      dueDate: "",
    },
  });

  const submit = (values: FormValues) => {
    onSubmit({
      customer: values.customer,
      amount: Number(values.amount || 0),
      contact: values.contact,
      items: values.items,
      dueDate: values.dueDate,
    });
  };

  return (
    <View style={styles.container}>
      <Typography variant="title" style={styles.header}>
        New utang
      </Typography>

      <Controller
        control={control}
        name="customer"
        rules={{ required: "Customer name is required", minLength: { value: 2, message: "Enter customer name" } }}
        render={({ field: { value, onChange } }) => (
          <Input placeholder="Customer name" value={value} onChangeText={onChange} />
        )}
      />
      {errors.customer?.message ? <Typography style={styles.error}>{errors.customer.message}</Typography> : null}

      <Controller
        control={control}
        name="amount"
        rules={{ required: "Amount is required", pattern: { value: /^[0-9]+(\.[0-9]{1,2})?$/, message: "Enter a valid amount" } }}
        render={({ field: { value, onChange } }) => (
          <Input placeholder="Amount ₱" keyboardType="numeric" value={value} onChangeText={onChange} />
        )}
      />
      {errors.amount?.message ? <Typography style={styles.error}>{errors.amount.message}</Typography> : null}

      <Controller
        control={control}
        name="contact"
        rules={{ required: "Contact number is required", minLength: { value: 9, message: "Enter contact number" } }}
        render={({ field: { value, onChange } }) => (
          <Input placeholder="Contact no." keyboardType="phone-pad" value={value} onChangeText={onChange} />
        )}
      />
      {errors.contact?.message ? <Typography style={styles.error}>{errors.contact.message}</Typography> : null}

      <Controller
        control={control}
        name="items"
        rules={{ required: "Items are required", minLength: { value: 2, message: "Enter item details" } }}
        render={({ field: { value, onChange } }) => <Input placeholder="Items" value={value} onChangeText={onChange} />}
      />
      {errors.items?.message ? <Typography style={styles.error}>{errors.items.message}</Typography> : null}

      <Controller
        control={control}
        name="dueDate"
        rules={{ required: "Due date is required", minLength: { value: 1, message: "Select a due date" } }}
        render={({ field: { value, onChange } }) => <Input placeholder="Due date (YYYY-MM-DD)" value={value} onChangeText={onChange} />}
      />
      {errors.dueDate?.message ? <Typography style={styles.error}>{errors.dueDate.message}</Typography> : null}

      <View style={styles.actions}>
        <Button title="Cancel" variant="outline" onPress={onClose} style={styles.actionButton} />
        <Button title="Save" onPress={handleSubmit(submit)} style={styles.actionButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  header: {
    marginBottom: 8,
  },
  error: {
    color: "#DC2626",
    fontSize: 12,
    marginBottom: 4,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
  },
});
