import { GET_STREAM_KEY, STREAM_DEFAULT_INFO } from "@/data/routes";
import api from "@/lib/api";
import { apiHandler } from "@/utils/function/apiHandler";
import {
  DefaultStreamInfoSchema,
  StreamKeySchema,
  type DefaultStreamInfoSchemaType,
} from "../schemas";

export const getStreamKeyRequest = async () =>
  apiHandler(StreamKeySchema, () => api.get(GET_STREAM_KEY));

export const getDefaultStreamInfoRequest = async () =>
  apiHandler(DefaultStreamInfoSchema, () => api.get(STREAM_DEFAULT_INFO));

export const updateDefaultStreamInfoRequest = async (
  data: DefaultStreamInfoSchemaType,
) =>
  apiHandler(DefaultStreamInfoSchema, () => api.put(STREAM_DEFAULT_INFO, data));

export const createDefaultStreamInfoRequest = async (
  data: DefaultStreamInfoSchemaType,
) =>
  apiHandler(DefaultStreamInfoSchema, () =>
    api.post(STREAM_DEFAULT_INFO, data),
  );
