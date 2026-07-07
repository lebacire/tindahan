import { useEffect, useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Typography from "../../components/ui/Typography";
import PautangForm from "../../features/pautang/components/PautangForm";
import { usePautangStore } from "../../features/pautang/store/pautangStore";
import { PautangItem } from "../../features/pautang/types";

function ToggleButton({
  active,
  title,
  onPress,
}: {
  active: boolean;
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.toggleButton,
        active ? styles.toggleActive : styles.toggleInactive,
      ]}
    >
      <Typography style={active ? styles.toggleActiveText : styles.toggleInactiveText}>
        {title}
      </Typography>
    </Pressable>
  );
}

function PautangCard({
  item,
  onMarkPaid,
}: {
  item: PautangItem;
  onMarkPaid: (id: string) => void;
}) {
  return (
    <Card style={styles.debtCard}>
      <View style={styles.cardHeader}>
        <View>
          <Typography variant="title">{item.customer}</Typography>
          <Typography style={styles.cardSubtitle}>{item.items}</Typography>
        </View>
        <Typography style={styles.cardAmount}>₱{item.amount.toFixed(2)}</Typography>
      </View>

      <View style={styles.statusRow}>
        <Typography style={styles.statusLabel}>{item.status.toUpperCase()}</Typography>
        <Typography style={styles.detailText}>Due {item.dueDate}</Typography>
      </View>

      <View style={styles.actionsRow}>
        <Button title="SMS" variant="outline" onPress={() => {}} style={styles.smallButton} />
        <Button title="Viber" variant="outline" onPress={() => {}} style={styles.smallButton} />
        <Button title="Bayad" variant="warning" onPress={() => onMarkPaid(item.id)} style={styles.smallButton} />
      </View>
    </Card>
  );
}

export default function Pautang() {
  const pautang = usePautangStore((state) => state.pautang);
  const tab = usePautangStore((state) => state.tab);
  const setTab = usePautangStore((state) => state.setTab);
  const loadPautang = usePautangStore((state) => state.loadPautang);
  const addPautang = usePautangStore((state) => state.addPautang);
  const markPaid = usePautangStore((state) => state.markPaid);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadPautang();
  }, []);

  const visibleItems = useMemo(
    () => pautang.filter((item) => item.status === tab),
    [pautang, tab]
  );

  const owedTotal = useMemo(
    () => visibleItems.reduce((sum, item) => sum + item.amount, 0),
    [visibleItems]
  );

  const handleSave = async (values: {
    customer: string;
    amount: number;
    contact: string;
    items: string;
    dueDate: string;
  }) => {
    await addPautang({
      id: Date.now().toString(),
      customer: values.customer,
      amount: values.amount,
      contact: values.contact,
      items: values.items,
      dueDate: values.dueDate,
      status: "unpaid",
    });
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <View>
          <Typography variant="title">Pautang</Typography>
          <Typography style={styles.subtitle}>
            {visibleItems.length} customers owe ₱{owedTotal.toFixed(2)}
          </Typography>
        </View>
        <Button title="New utang" onPress={() => setModalVisible(true)} style={styles.newButton} />
      </View>

      <View style={styles.toggleRow}>
        <ToggleButton title="Unpaid" active={tab === "unpaid"} onPress={() => setTab("unpaid")} />
        <ToggleButton title="Paid" active={tab === "paid"} onPress={() => setTab("paid")} />
      </View>

      <ScrollView contentContainerStyle={styles.listContent} style={styles.list}>
        {visibleItems.length ? (
          visibleItems.map((item) => (
            <PautangCard key={item.id} item={item} onMarkPaid={markPaid} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Typography style={styles.emptyTitle}>No records yet</Typography>
            <Typography style={styles.emptyText}>
              Add a new utang to keep track of your collection.
            </Typography>
          </View>
        )}
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Typography variant="title">New utang</Typography>
              <Pressable onPress={() => setModalVisible(false)} style={styles.modalClose}>
                <Typography style={styles.modalCloseText}>×</Typography>
              </Pressable>
            </View>
            <PautangForm onSubmit={handleSave} onClose={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F1EE",
    padding: 20,
  },
  headerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  subtitle: {
    color: "#6B7280",
    marginTop: 6,
  },
  newButton: {
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  toggleRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: "center",
  },
  toggleActive: {
    backgroundColor: "#111827",
  },
  toggleInactive: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  toggleActiveText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  toggleInactiveText: {
    color: "#111827",
    fontWeight: "700",
  },
  list: {
    flex: 1,
  },
  listContent: {
    gap: 14,
    paddingBottom: 120,
  },
  debtCard: {
    borderRadius: 24,
    padding: 18,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  cardSubtitle: {
    color: "#6B7280",
    marginTop: 4,
  },
  cardAmount: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  statusLabel: {
    color: "#F59E0B",
    fontWeight: "700",
  },
  detailText: {
    color: "#6B7280",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
  },
  smallButton: {
    flex: 1,
  },
  emptyState: {
    paddingTop: 40,
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  emptyText: {
    marginTop: 10,
    color: "#6B7280",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalClose: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F4F1EE",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCloseText: {
    fontSize: 20,
    color: "#111827",
  },
});
