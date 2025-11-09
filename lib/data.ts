import { createClient } from "./supabase/server";
import {
  StudentProfile,
  StaffProfile,
  ConductReport,
  ConductReportWithReporter,
  StudentConductRecord,
  FacultyLoggedStudentRecord,
  ConductReportWithStudent,
} from "@/types";

export async function fetchStudentProfiles() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from("student_profiles").select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data as StudentProfile[];
  } catch (error) {
    console.error("Database Error: Failed to fetch student profiles.", error);

    throw new Error("Failed to fetch student profiles.");
  }
}

export async function fetchStudentProfile(id: string) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("student_profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Database error: Failed to fetch student profile.", error);
    throw new Error("Failed to fetch student profile.");
  }
}

export async function fetchStaffProfile(id: string) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("staff_profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Database error: Failed to fetch student profile.", error);
    throw new Error("Failed to fetch student profile.");
  }
}

export async function fetchStaffProfiles() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from("staff_profiles").select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data as StaffProfile[];
  } catch (error) {
    console.error("Database Error: Failed to fetch staff profiles.", error);

    throw new Error("Failed to fetch staff profiles.");
  }
}

export async function fetchStudentConductRecordsWithReporter(id: string) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("conduct_reports")
      .select("*, staff_profiles (full_name, title)")
      .eq("student_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data as ConductReportWithReporter[];
  } catch (error) {
    console.error(
      "Database Error: Failed to fetch student conduct records with reporter.",
      error
    );
    throw new Error("Failed to fetch student conduct record with reporter.");
  }
}

export async function fetchFacultyReportsWithStudent(id: string) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("conduct_reports")
      .select("*, student_profiles (full_name, student_id)")
      .eq("faculty_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data as ConductReportWithStudent[];
  } catch (error) {
    console.error(
      "Database Error: Failed to fetch faculty reports with student.",
      error
    );
    throw new Error("Failed to fetch faculty reports with student.");
  }
}
