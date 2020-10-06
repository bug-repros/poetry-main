from poetry_dep1.dep import Dep


def main() -> None:
    names = {"a", "b"}
    d = Dep(names)
    print(d.has_name("a"))


if __name__ == "__main__":
    main()
