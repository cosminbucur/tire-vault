import { supabase } from "./supabaseClient";
import { CustomerFormValues } from "@/components/CustomerForm";
import { ServiceFormValues } from "@/components/ServiceForm";
import { Tire } from "@/components/VisitSummary";

export interface VisitData {
  customer: CustomerFormValues;
  service: ServiceFormValues;
  tires: Tire[];
  storage: {
    point: string;
    caps: string;
  };
}

export const visitService = {
  async createVisit(data: VisitData) {
    const { customer, service, tires, storage } = data;

    // 1. Upsert Customer
    const { data: customerData, error: customerError } = await supabase
      .from("customers")
      .upsert(
        {
          first_name: customer.firstName,
          last_name: customer.lastName,
          company: customer.company,
          phone: customer.phone,
          email: customer.email,
        },
        { onConflict: "email" }
      )
      .select()
      .single();

    if (customerError) throw customerError;

    // 2. Create Visit
    const { data: visitData, error: visitError } = await supabase
      .from("visits")
      .insert({
        customer_id: customerData.id,
        license_plate: service.licensePlate,
        mechanic_id: service.mechanic,
        services_performed: service.servicesPerformed,
        notes: service.notes,
        status: "Pending",
        storage_point: storage.point,
        caps_number: storage.caps,
      })
      .select()
      .single();

    if (visitError) throw visitError;

    // 3. Insert Tires
    if (tires.length > 0) {
      const tiresToInsert = tires.map((tire) => ({
        visit_id: visitData.id,
        brand: tire.brand,
        width: tire.width,
        height: tire.height,
        diameter_type: tire.diameterType,
        season: tire.season.toLowerCase().replace("-", "_"),
        rim_type: tire.rimType.toLowerCase(),
        tire_type: tire.tireType.toLowerCase(),
        wear_indicator: tire.wearIndicator.toLowerCase(),
        location: tire.location.toLowerCase(),
      }));

      const { error: tiresError } = await supabase
        .from("tires")
        .insert(tiresToInsert);

      if (tiresError) throw tiresError;
    }

    return visitData;
  },

  async getVisits() {
    const { data, error } = await supabase
      .from("visits")
      .select(`
        *,
        customers (
          first_name,
          last_name
        )
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data.map((v: any) => ({
      id: v.id,
      licensePlate: v.license_plate,
      customerName: `${v.customers.first_name} ${v.customers.last_name}`,
      services: v.services_performed,
      date: v.visit_date,
      status: v.status,
    }));
  },
};
