import supabaseConfig from "../config/supabase-config";

export const addNewTransaction = async (transaction: any) => {
  try {
    const response = await supabaseConfig
      .from("transactions")
      .insert([transaction]);
    if (response.error) {
      throw new Error(response.error.message);
    }
    return response.data;
  } catch (error: any) {
    throw new Error("Error adding Transaction: " + error.message);
  }
};

export const updateTransaction = async (
  transactionId: string,
  payload: any
) => {
  try {
    const response = await supabaseConfig
      .from("transactions")
      .update(payload)
      .eq("id", transactionId);
    if (response.error) {
      throw new Error(response.error.message);
    }
    return response.data;
  } catch (error: any) {
    throw new Error("Error Updating transaction" + error.message);
  }
};

export const deleteTransaction = async (transactionId: string) => {
  try {
    const response = await supabaseConfig
      .from("transactions")
      .delete()
      .eq("id", transactionId);
    if (response.error) {
      throw new Error(response.error.message);
    }
    return response.data;
  } catch (error: any) {
    throw new Error("Error Updating transaction" + error.message);
  }
};

export const getTransactions = async (userId: string, filtersData: any) => {
  try {
    let query: any = supabaseConfig
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (filtersData.type) {
      query = query.eq("type", filtersData.type);
    }
    if (filtersData.category) {
      query = query.eq("category", filtersData.category);
    }
    if (filtersData.date) {
      query = query.eq("date", filtersData.date);
    }
    const { data, error } = await query;
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error: any) {
    throw new Error("Error fetching transaction" + error.message);
  }
};
export const getTransactionById = async (transactionId: string) => {
  try {
    const response = await supabaseConfig
      .from("transactions")
      .select("*")
      .eq("id", transactionId);
    if (response.error) {
      throw new Error(response.error.message);
    }
    return response.data[0];
  } catch (error: any) {
    throw new Error("Error Updating transaction" + error.message);
  }
};

export const getTransactionsDashboardData = async (userId: string) => {
  try {
    const { data, error } = await supabaseConfig
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }
    const lastFiveTransactions = data.slice(0, 5);

    const totalIncome = data.reduce(
      (acc: number, transaction: any) =>
        transaction.type === "income" ? acc + Number(transaction.amount) : acc,
      0
    );
    const totalExpenses = data.reduce(
      (acc: number, transaction: any) =>
        transaction.type === "expense" ? acc + Number(transaction.amount)  : acc,
      0
    );
    const totalSavings = totalIncome - totalExpenses;
    return {
      totalIncome,
      totalExpenses,
      totalSavings,
      lastFiveTransactions,
    };
  } catch (error: any) {
    throw new Error(
      "Error Fetching transactions dashboard data:" + error.message
    );
  }
};
