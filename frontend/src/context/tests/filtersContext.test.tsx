import { describe, it, expect, vi } from "vitest";
import { render, act } from "@testing-library/react";
import QueryFiltersContext, {
  QueryFiltersContextProvider,
} from "@/context/filtersContext";
import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";

describe("QueryFiltersContext", () => {
  it("provides the correct context value", () => {
    const TestComponent = () => {
      const context = useContext(QueryFiltersContext);
      expect(context).toHaveProperty("setFilter");
      expect(context).toHaveProperty("removeFilter");
      expect(context).toHaveProperty("getActiveFilter");
      expect(context).toHaveProperty("allActiveFilters");
      return null;
    };

    render(
      <BrowserRouter>
        <QueryFiltersContextProvider>
          <TestComponent />
        </QueryFiltersContextProvider>
      </BrowserRouter>
    );
  });

  it("sets a filter correctly", () => {
    let contextValue;
    const TestComponent = () => {
      contextValue = useContext(QueryFiltersContext);
      return null;
    };

    render(
      <BrowserRouter>
        <QueryFiltersContextProvider>
          <TestComponent />
        </QueryFiltersContextProvider>
      </BrowserRouter>
    );

    act(() => {
      contextValue.setFilter({ name: "test", value: "value" });
    });

    expect(contextValue.getActiveFilter("test")).toBe("value");
  });

  it('removes a filter correctly', () => {
    let contextValue;
    const TestComponent = () => {
      contextValue = useContext(QueryFiltersContext);
      return null;
    };

    render(
      <BrowserRouter>
        <QueryFiltersContextProvider>
          <TestComponent />
        </QueryFiltersContextProvider>
      </BrowserRouter>
    );

    act(() => {
      contextValue.setFilter({ name: 'test', value: 'value' });
      contextValue.removeFilter('test');
    });

    expect(contextValue.getActiveFilter('test')).toBe('');
  });

  it('bulk sets filters correctly', () => {
    let contextValue;
    const TestComponent = () => {
      contextValue = useContext(QueryFiltersContext);
      return null;
    };

    render(
      <BrowserRouter>
        <QueryFiltersContextProvider>
          <TestComponent />
        </QueryFiltersContextProvider>
      </BrowserRouter>
    );

    act(() => {
      contextValue.bulkSetFilters([
        { name: 'test1', value: 'value1' },
        { name: 'test2', value: 'value2' },
      ]);
    });

    expect(contextValue.getActiveFilter('test1')).toBe('value1');
    expect(contextValue.getActiveFilter('test2')).toBe('value2');
  });

  it('removes all filters correctly', () => {
    let contextValue;
    const TestComponent = () => {
      contextValue = useContext(QueryFiltersContext);
      return null;
    };

    render(
      <BrowserRouter>
        <QueryFiltersContextProvider>
          <TestComponent />
        </QueryFiltersContextProvider>
      </BrowserRouter>
    );

    act(() => {
      contextValue.setFilter({ name: 'test1', value: 'value1' });
      contextValue.setFilter({ name: 'test2', value: 'value2' });
      contextValue.removeAllFilters();
    });

    expect(contextValue.allActiveFilters).toHaveLength(1);
    expect(contextValue.allActiveFilters[0].name).toBe('');
    expect(contextValue.allActiveFilters[0].value).toBe(undefined);
  });
});